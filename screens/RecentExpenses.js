import { useContext, useEffect, useState } from 'react';

import ChildCasesOutput from '../components/CasesOutput/ChildCasesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { CaseContext } from '../store/case-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const expensesCtx = useContext(CaseContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        // const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ChildCasesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
