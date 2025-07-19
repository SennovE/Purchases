import { Navigate } from 'react-router-dom';
import './index.css'
import { OrdersTable } from './table/orders';


export default function Login() {
  const token = localStorage.getItem('purchasesToken');

  if (!token) return <Navigate to='/login' replace />;

  return (
    <div className='main-page'>
      <OrdersTable />
    </div>
  );
}
