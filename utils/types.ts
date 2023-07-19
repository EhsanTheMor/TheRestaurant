import { FoodType } from '@/components/FoodMenu';

export type TableType = {
     _id: string;
     tableName: string;
     seatingCapacity: number;
     availability: boolean;
     specialFeatures: string[];
     mapUrl: string;
     prices: {
          "9": number,
          "10": number,
          "11": number,
          "12": number,
          "13": number,
          "14": number,
          "15": number,
          "16": number,
          "17": number,
          "18": number,
          "19": number,
          "20": number,
          "21": number,
          "22": number,
          "23": number
     }
};

export type CartOrderType = {
     id: string;
     table: TableType;
     foodList: { food: FoodType; amount: number }[];
     userID: string | null;
     totalPrice: number | null;
     orderDate: {
          year: number;
          month: number;
          day: number;
     };
     orderTime: number[];
     discountApplied: number | null;
};
