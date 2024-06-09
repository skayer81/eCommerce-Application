// import { getCustomerBasket } from '@/api/clientService';
// import { useQuery } from '@tanstack/react-query';

// function getBasket(userID) {
//   // const userID = useUserStore().userId;
//   const { data, error, isPending } = useQuery({
//     queryKey: ['cart', userID],
//     // queryFn: () => createBasket({key: 'testBusket', currency: 'US', customerId :userID, manage_orders: '5' }),
//     // queryFn: () => createBasket(d),
//     queryFn: () => getCustomerBasket(userID), // createBasket(d),
//     //  select: productAdapter,
//   });
//   if (error) return error;
//   return data;
// }

// const addBusketToState = (userID): voud => {
//   // let data = getBasket(userID);
//   const { data, error, isPending } = useQuery({
//     queryKey: ['cart', userID],
//     // queryFn: () => createBasket({key: 'testBusket', currency: 'US', customerId :userID, manage_orders: '5' }),
//     // queryFn: () => createBasket(d),
//     queryFn: () => getCustomerBasket(userID), // createBasket(d),
//     //  select: productAdapter,
//   });
//   if (error) return error;
//   return data;
// };

// export default addBusketToState;
