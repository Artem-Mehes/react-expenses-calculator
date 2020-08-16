import React from 'react';

function Operation({ addTransaction, addDescription, addAmount, description, amount, showError }) {
    return (
        <section className="operation">
            <h3>New Operation</h3>
            <form id="form">
                    <input 
                        type="text" 
                        className="operation__fields operation__name" 
                        placeholder="Operation Name"
                        onChange={addDescription} 
                        value={description}
                    />
                    <input 
                        type="number" 
                        className="operation__fields operation__amount" 
                        placeholder="Amount" 
                        onChange={addAmount} 
                        value={amount}
                    />
                    {showError && <span class="error">Amount should not be blank</span>}
                <div className="operation__btns">
                    <button 
                    type="button" 
                    className="operation__btn operation__btn-add"
                    onClick={() => addTransaction(true)}>
                    INCOME
                    </button>

                    <button
                    type="button" 
                    className="operation__btn operation__btn-subtract"
                    onClick={() => addTransaction(false)}>
                    OUTCOME
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Operation;