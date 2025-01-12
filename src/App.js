import './App.css';
import {useReducer} from 'react';

const initialState = {
    accountStatus: 'closed',
    balance: 0,
    loan: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return {...state, accountStatus: 'open'}
        case 'deposit150':
            if (state.accountStatus === 'closed') return state;
            return {...state, balance: state.balance + 150}

        case 'withdraw50':
            if (state.accountStatus === 'closed') return state;
            return {...state, balance: state.balance - 50}


        case 'requestLoan5000':
            if (state.accountStatus === 'closed') return state;
            return {...state, balance: state.balance + 5000, loan: state.loan + 5000, loanStatus: 'open'};


        case 'payloan':
            if (state.accountStatus === 'closed') return state;
            return {...state, balance: state.balance - 5000, loan: state.loan-5000, loanStatus: 'closed'};


        case 'close':
            if (state.accountStatus === 'closed') return state;
            if (state.balance !== 0 || state.loan !== 0) {
                alert('make balance and loan 0')
                return state;
            }
            if (state.balance === 0 && state.loan === 0) {
                return initialState;
            }
            break;

        default:
            throw new Error(`Unknown action type ${action.type}`);


    }
}

function App() {
    const [{accountStatus, balance, loan}, dispatch] = useReducer(reducer, initialState);
  return (<>

          <h1>useReducer bank Account</h1>
          <h2>balance : {balance}</h2>
          <h2>Loan:{loan}</h2>
          {accountStatus === 'closed' ? <button
              onClick={() => dispatch({type: 'open'})}

          >Open account</button> : <button disabled>open account</button>}
          <button onClick={()=>{dispatch({type:'deposit150'})}}>Deposit 150</button>
          <button onClick={()=>{dispatch({type:'withdraw50'})}}>Withdraw 50</button>
      {loan > 4000 ?
          <button disabled>Request a loan 5000</button> :
          <button onClick={()=>dispatch({type:'requestLoan5000'})}>Request a loan 5000</button>}
          <button onClick={()=>{dispatch({type:'payloan'})}}>Pay loan</button>
          <button onClick={()=>dispatch({type:'close'})}>close account</button>

      </>
  );
}

export default App;
