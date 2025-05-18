import { NextResponse } from 'next/server';
import { connectDB } from '../infra/mongoDb';
import { IResponse } from '../interfaces';
import InfoModel from '../repositories/info/models/info';
import { InfoRepository } from '../repositories/info';
import { checkClientMiddleware } from '../middlewares/check-client/middleware';

const infoRepository = new InfoRepository(InfoModel, connectDB);

export async function POST(req: Request): Promise<NextResponse<IResponse>> {
  const execute = async () => {
    try {
      const body = await req.json();
       
      try {
        const { title, description, clientId } = body;

        if (!title || title.length < 5 || typeof title !== 'string') {
          return NextResponse.
            json({ message: 'O título é obrigatório, precisa ter no mínimo 5 letras e ser do tipo string!' }, { status: 400 });
        }

        if (!description || description.length < 5 || typeof description !== 'string') {
          return NextResponse.
            json({ message: 'A descrição é obrigatória, precisa ter no mínimo 5 letras e ser do tipo string!' }, { status: 400 });
        }

        if (!clientId || typeof clientId !== 'string') {
          return NextResponse.
            json({ message: 'O id do cliente é obrigatório e precisa ser do tipo string!' }, { status: 400 });
        }
      
        await infoRepository.create(body);

        return NextResponse.json({ message: 'Informação criada!' }, { status: 201 });
      } catch {
        return NextResponse.json({ message: 'Não foi possível adicionar essa informação!' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 400 });
    }

  };

  return await checkClientMiddleware(req, execute);
}

export async function DELETE(req: Request): Promise<NextResponse<IResponse>> {
  const execute = async () => {
    try {
      const body = await req.json();
           
      try {
        const { infoId } = body;
    
        if (!infoId || typeof infoId !== 'string') {
          return NextResponse.
            json({ message: 'O id da informação é obrigatório e precisar ser do tipo string!' }, { status: 400 });
        }
          
        await infoRepository.delete(infoId);
    
        return NextResponse.json({ message: 'Informação deletada!' }, { status: 200 });
      } catch {
        return NextResponse.json({ message: 'Não foi possível deletar essa informação!' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 400 });
    }
    
  };
    
  return await checkClientMiddleware(req, execute);
}

export async function PUT(req: Request): Promise<NextResponse<IResponse>> {
  const execute = async () => {
    try {
      const body = await req.json();
             
      try {
        const { infoId, title, description } = body;

        if (!title && !description) {
          return NextResponse.
            json({ message: 'Nenhum dado de modificação encontrado!' }, { status: 400 });
        }
      
        if (!infoId || typeof infoId !== 'string') {
          return NextResponse.
            json({ message: 'O id da informação é obrigatório e precisar ser do tipo string!' }, { status: 400 });
        }

        if (title?.length < 5 || (title && typeof title !== 'string')) {
          return NextResponse.
            json({ message: 'O título precisa ter no mínimo 5 letras e ser do tipo string!' }, { status: 400 });
        }
  
        if (description?.length < 5 || (description && typeof description !== 'string')) {
          return NextResponse.
            json({ message: 'A descrição precisa ter no mínimo 5 letras e ser do tipo string!' }, { status: 400 });
        }
            
        await infoRepository.update({ description, title },infoId);
      
        return NextResponse.json({ message: 'Informação atualizada!' }, { status: 200 });
      } catch {
        return NextResponse.json({ message: 'Não foi possível atualizar essa informação!' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ message: 'Nenhum dado encontrado no corpo da requisição!' }, { status: 400 });
    }
      
  };
      
  return await checkClientMiddleware(req, execute);
}
