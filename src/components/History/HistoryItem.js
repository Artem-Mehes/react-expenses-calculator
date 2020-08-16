import React from 'react';

function HistoryItem({ key, transaction, deleteTransaction }) {
    return (
        <li 
            key={key} 
            className={`history__item history__item-${transaction.add ? 
                'plus' : 
                'minus'}`}>
            {transaction.description}
            <span className="history__money">{transaction.amount} ₽</span>
            <button onClick={() => deleteTransaction(transaction.id)} className="history__delete">x</button>
        </li>
    );
}

export default HistoryItem;