'use client';

export interface HeaderUsersElement {
  name: string;
  telephone: string
}

interface HeaderUsersProps {
    users: HeaderUsersElement[];
    selectedUserTelephone: string;
    onChange:  (user: string) => void
}

export const HeaderUsers = ({ users, selectedUserTelephone, onChange }: HeaderUsersProps) => {

  const handleOnChange = (user: string) => {
    if (selectedUserTelephone === user) {
      onChange('');
      return;
    };

    onChange(user);
  };

  return users.length > 0 ? <div className="w-full flex flex-col gap-1">
    <span className="text-gray-500">Filtro por usuários:</span>
    <div className='w-full bg-gray-200 px-2 py-2 rounded-md min-h-fit gap-2 flex overflow-x-auto'>
      {
        users.map(user => 
          <div 
            key={user.telephone} 
            className={
              `
                ${selectedUserTelephone === user.telephone ? 'border border-primary bg-primaryLow' : ''} 
                cursor-pointer text-[0.875rem] bg-gray-300 p-1 px-2 rounded-md text-gray-800
              `
            }
            onClick={() => handleOnChange(user.telephone)}
          >
            {user.name}
            <div className="text-[10px] text-gray-500">{user.telephone}</div>
          </div>
        )
      }
    </div> 
  </div> : null;
};