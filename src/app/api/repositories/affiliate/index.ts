import { AffiliateSell, GetAffiliateSellRepositoryResponse } from './interfaces';
import AffiliateSellModel from './models/affiliate';


export class AffiliateRepository {
  private affiliateSellModal: typeof AffiliateSellModel;
  private connect: () => Promise<void>;

  constructor(affiliateSellModal: typeof AffiliateSellModel, connect: () => Promise<void>) {
    this.affiliateSellModal = affiliateSellModal;
    this.connect = connect;
    this.connect();
  }

  async createSell(sell: AffiliateSell) {
    try {  
      await this.affiliateSellModal.create(sell);
    } catch (error) {
      throw new Error('Affiliate sell do not created!', { cause: error });
    }
  }

  async getAllSells(clientId: string): Promise<GetAffiliateSellRepositoryResponse[]> {
    try {  
      const allSells: GetAffiliateSellRepositoryResponse[] = await this.affiliateSellModal.find({ affiliateId: clientId }).lean<GetAffiliateSellRepositoryResponse[]>();

      if(!allSells.length) throw new Error('None sell founded!');

      return allSells;
    } catch (error) {
      throw new Error('Affiliate sell do not created!', { cause: error });
    }
  }
}
