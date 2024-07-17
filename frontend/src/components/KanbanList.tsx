import React from 'react'

interface KanbanProps {
    children?: React.ReactNode; 
  }

const KanbanList:React.FC<KanbanProps> = ({children}) => {
  return (
    <div className="kanbanListWrap">
        {children}
    </div>
  );
}

export default KanbanList;