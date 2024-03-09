import styles from './companyCash.module.css'
import React, { useState, useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const CompanyCash = () => {
    const [transactions, setTransactions] = useState(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
        return storedTransactions || [];
    });
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    const addTransaction = () => {
        if (amount.trim() === '' || description.trim() === '') {
            return
        }

        const newTransaction = {
          amount: parseFloat(amount),
          description: description
        };
        setTransactions([newTransaction, ...transactions]);
        setAmount('');
        setDescription('');
        window.location.reload()
    };
    const deleteTransaction = (index) => {
        const updatedTransactions = [...transactions];
        updatedTransactions.splice(index, 1);
        setTransactions(updatedTransactions);
        window.location.reload()
    };
    
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);
    

    const getTotalOrçamentos = () => {
        const orçamentos = JSON.parse(localStorage.getItem('orçamentos')) || [];
      
        let total = 0;
      
        for (const orçamento of orçamentos) {
          total += parseFloat(orçamento.valor);
        }
      
        return total;
    };

    const totalOrçamentos = getTotalOrçamentos();


    const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    const updBalance = balance - (totalOrçamentos)


    

    return (
        <div className={styles.companyCash}>
            {/* <div className={styles.cashDiv}>
                <h2 className={styles.cash}>Company cash: </h2>
                <h3 className={styles.cashAmount} style={{ color: updBalance < 0 ? '#a60e0e' : 'green' }}>
                    ${updBalance.toFixed(2)}
                </h3> 
            </div>     */}
            <div className={styles.addT}>
                <input required className={styles.Value} type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <input required className={styles.Description} type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <button className={styles.button} type='submit' onClick={addTransaction}>Add</button>
            </div>
            <div className={styles.divT}>
                <h2 className={styles.transact}>Transactions:</h2>
            </div>
            <div className={styles.transactList}>       
                <ul>
                    {transactions.map((transaction, index) => (
                        <li 
                        className={styles.transactions}
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <span className={styles.descr}>{transaction.description}</span>
                            <span className={styles.amountT}>${ transaction.amount}</span>
                            {hoveredIndex === index && (
                                <button className={styles.btn} onClick={() => deleteTransaction(index)} style={{ background: 'transparent', border: 'none' }}><RiDeleteBinLine /></button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
               
        </div>

    )
}


let b = 0;

const updBalance = (newTransaction) => {
  // Lógica para atualizar o saldo
  b += newTransaction.amount;
};

// Função para obter o saldo atual
const getBalance = () => {
  return b;
};

export { updBalance, getBalance };

export default CompanyCash

export const calculaUpdBalance = (balance, totalOrcamentos) => {
    const updBalance = balance - totalOrcamentos;
    return updBalance;
};
