import React, { Component } from 'react';
import Total from './components/Total/Total';
import History from './components/History/History';
import Operation from './components/Operation/Operation';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: JSON.parse( localStorage.getItem('transactions') ) || [],
            description: '',
            amount: '',
            income: 0,
            outcome: 0,
            balance: 0,
            showError: false
        }
    }

    componentWillMount = () => {
        this.getBalance();
    }

    componentDidUpdate = () => {
        this.addStorage();
    }

	addTransaction = add => {
        if (this.state.amount) {
            const transactions = [...this.state.transactions, 
                {
                    id: `cmr${ String(+new Date()) }`,  
                    description: this.state.description,
                    amount: parseFloat(this.state.amount),
                    add
                }
            ];
    
            this.setState({ 
                transactions,
                description: '',
                amount: '',
                showError: false
            }, this.getBalance);
        } else this.setState( { showError: true } );

     }

    getIncome = () => {
        return this.state.transactions
            .reduce( (acc, item) => item.add ? acc + item.amount : acc, 0 );
    }

    getOutcome = () => {
        return this.state.transactions
            .reduce( (acc, item) => !item.add ? acc + item.amount : acc, 0 );
    }
    
    getBalance = () => {
        const income = this.getIncome();
        const outcome = this.getOutcome();
        const balance = income - outcome;

        this.setState({ income, outcome, balance });
    }

	addAmount = e => {
        this.setState({ amount: e.target.value });
	}

	addDescription = e => {
		this.setState({ description: e.target.value });
    }
    
    addStorage = () => {
        localStorage.setItem( 'transactions', JSON.stringify(this.state.transactions) );
    }

    deleteTransaction = id => {
        const transactions = this.state.transactions.filter(item => item.id !== id);

        this.setState( { transactions }, this.getBalance);
    }

	render() {
		return (
			<>
				<header>
					<h1>Costs Calculator</h1>
				</header>

				<main>
					<div className="container">
                        <Total 
                            income={this.state.income} 
                            outcome={this.state.outcome} 
                            balance={this.state.balance}
                        />

                        <History 
                            transactions={this.state.transactions}
                            deleteTransaction={this.deleteTransaction}
                        />

						<Operation 
							addTransaction={this.addTransaction} 
							addAmount={this.addAmount}
							addDescription={this.addDescription}
							description={this.state.description}
                            amount={this.state.amount}
                            showError={this.state.showError}
						/>
					</div>
				</main>
			</>
		);
	};
}

export default App;
