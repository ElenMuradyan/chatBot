import { ReactNode } from 'react';

const FunctionLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 p-6 text-white">
    {
            children
           }
    </div>
  );
};

export default FunctionLayout;
//isnt used