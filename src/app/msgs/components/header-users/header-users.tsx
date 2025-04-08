'use client';

interface HeaderUsersProps {
    users: string[];
    selectedUser: string;
    onChange:  (user: string) => void
}

export const HeaderUsers = ({ users, selectedUser, onChange }: HeaderUsersProps) => {

  const handleOnChange = (user: string) => {
    if (selectedUser === user) {
      onChange('');
      return;
    };

    onChange(user);
  };

  return users.length > 0 ? <div className="w-full flex flex-col gap-1">
    <span className="text-gray-500">Filtro por usuários:</span>
    <div className='w-full bg-gray-200 px-2 rounded-md min-h-fit gap-2 flex overflow-x-auto'>
      {
        users.map(user => 
          <div 
            key={user} 
            className={
              `
                    ${selectedUser === user ? 'text-primary' : 'text-gray-500 underline-offset-1 underline'} 
                    cursor-pointer text-[0.875rem]
                `
            }
            onClick={() => handleOnChange(user)}
          >
            {user}
          </div>
        )
      }
    </div> 
  </div> : null;
};