import { createContext, useReducer } from 'react';

export const CaseContext = createContext({
  cases: [],
  addCase: ({ description, amount, date }) => {},
  setCase: (cases) => {},
  deleteCase: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addCase(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function setCase(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function deleteCase(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateCase(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setCase: setCase,
    addCase: addCase,
    deleteCase: deleteCase,
    updateCase: updateCase,
  };

  return (
    <CaseContext.Provider value={value}>
      {children}
    </CaseContext.Provider>
  );
}

export default ExpensesContextProvider;
