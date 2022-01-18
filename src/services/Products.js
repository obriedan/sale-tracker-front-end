// firebase imports
import { getDocs } from 'firebase/firestore';

const Products = {
  getProductsFromFirebase: async function (query) {
    try {
      const data = await getDocs(query);

      let products = [];
      let lastKey = data.docs[data.docs.length - 1];

      data.forEach((doc) => {
        products.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      return { products, lastKey };
    } catch (error) {
      console.log(error);
    }
  },
};

export default Products;
