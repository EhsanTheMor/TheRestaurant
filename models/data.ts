import { ObjectId } from 'mongodb';
import { Query, Schema, model, models } from 'mongoose';

const userSchema = new Schema(
     {
          userName: {
               type: String,
               required: [true, 'Username field is required'],
               unique: false,
          },
          userEmail: {
               type: String,
               required: [true, 'Please provide complete information'],
               unique: true,
          },
          password: {
               type: String,
               required: [true, 'Please provide complete information'],
               select: false,
          },
          passwordConfirm: {
               type: String,
          },
          contactInformation: {
               type: [String],
          },
          role: {
               type: String,
               enum: ['user', 'admin', 'owner'],
               default: 'user',
          },
     },
     {
          toJSON: { virtuals: true },
          toObject: { virtuals: true },
     },
);

userSchema.index({ userEmail: 1 }, { unique: true });

userSchema.virtual('userOrders', {
     ref: 'Order',
     foreignField: 'userID',
     localField: '_id',
});

userSchema.pre('save', function (next) {
     if (this.password !== this.passwordConfirm)
          return next(new Error('Please confirm your password'));

     this.passwordConfirm = undefined;

     next();
});

userSchema.pre<Query<any, any>>(/^find/, function (next) {
     this.select('-__v -passwodConfirm').populate({
          path: 'userOrders',
          select: '_id orderDate orderTime tableID',
     });

     next();
});

const tableSchema = new Schema(
     {
          tableName: {
               type: String,
               required: true,
               unique: true,
          },
          seatingCapacity: {
               type: Number,
               required: true,
          },
          availability: {
               type: Boolean,
               default: true,
          },
          specialFeatures: [String],
          mapUrl: {
               type: String,
          },
          prices: {
               '9': {
                    type: Number,
                    default: 50000,
               },
               '10': {
                    type: Number,
                    default: 50000,
               },
               '11': {
                    type: Number,
                    default: 50000,
               },
               '12': {
                    type: Number,
                    default: 50000,
               },
               '13': {
                    type: Number,
                    default: 50000,
               },
               '14': {
                    type: Number,
                    default: 50000,
               },
               '15': {
                    type: Number,
                    default: 50000,
               },
               '16': {
                    type: Number,
                    default: 50000,
               },

               '17': {
                    type: Number,
                    default: 50000,
               },

               '18': {
                    type: Number,
                    default: 50000,
               },

               '19': {
                    type: Number,
                    default: 50000,
               },

               '20': {
                    type: Number,
                    default: 50000,
               },

               '21': {
                    type: Number,
                    default: 50000,
               },

               '22': {
                    type: Number,
                    default: 50000,
               },

               '23': {
                    type: Number,
                    default: 50000,
               }
          }
     },
     {
          toJSON: { virtuals: true },
          toObject: { virtuals: true },
     },
);

tableSchema.virtual('tableOrders', {
     ref: 'Order',
     foreignField: 'tableID',
     localField: '_id',
});

tableSchema.pre<Query<any, any>>(/^find/, function (next) {
     this.populate({
          path: 'tableOrders',
          select: '_id orderStatus orderDate orderTime',
     });

     next();
});

export interface FoodSchemaType {
     foodName: string;
     description: string;
     price: number;
     priceDiscount: number;
     category: string;
     ingredients: string[];
     image: string;
     availability: boolean;
     createdDate: Date;
     updatedDate: Date;
}

const foodSchema = new Schema<FoodSchemaType>({
     foodName: {
          type: String,
          required: [true, 'Food Name is required.'],
          unique: true,
     },
     description: {
          type: String,
     },
     price: {
          type: Number,
          required: [true, 'Price is required for food'],
     },
     priceDiscount: {
          type: Number,
          default: 0,
     },
     category: {
          type: String,
          required: [true, 'Each food should have category'],
     },
     ingredients: {
          type: [String],
          required: [true, 'The ingredients of the foods must be prepared'],
     },
     image: {
          type: String,
          required: [true, 'Each food should have an image'],
          unique: true,
     },
     availability: {
          type: Boolean,
          required: [true, 'Declare weather this food is available or not'],
     },
     createdDate: {
          type: Date,
          default: Date.now(),
     },
     updatedDate: {
          type: Date,
     },
});

export interface OrderSchemaType {
     tableID: ObjectId;
     foodList: {
          amount: number;
          food: ObjectId[]
     };
     userID: ObjectId;
     totalPrice: number;
     orderStatus: string;
     orderDate: {
          year: number;
          month: number;
          day: number;
     };
     orderTime: number[];
     discountApplied: number;
}

const orderSchema = new Schema<OrderSchemaType>({
     totalPrice: {
          type: Number,
          required: [true, 'Total privce should be provided.'],
     },
     orderStatus: {
          type: String,
          default: 'active',
          enum: ['active', 'outDated', 'served', 'canceled'],
     },
     orderDate: {
          year: {
               type: Number,
               required: [true, 'Year is required'],
          },
          month: {
               type: Number,
               min: 1,
               max: 12,
               required: [true, 'Month is required'],
          },
          day: {
               type: Number,
               min: 1,
               max: 31,
               required: [true, 'Day is required'],
          },
     },
     orderTime: {
          type: [Number],
          min: 9,
          max: 23,
          required: [true, 'Time should be passed'],
     },
     discountApplied: {
          type: Number,
          default: 0,
     },
     tableID: {
          type: ObjectId,
          ref: 'Table',
          required: [true, 'You did not select any table'],
     },
     userID: {
          type: ObjectId,
          ref: 'User',
          required: [true, 'You did not select any user'],
     },
     foodList: [
          {
               amount: {
                    type: Number,
                    default: 1,
               },
               food: {
                    type: ObjectId,
                    ref: 'Food',
               }

          },
     ],
});

orderSchema.pre('save', async function (next) {
     try {
          const tableTimesAggregate = await Order.aggregate([
               {
                    $match: {
                         tableID: this.tableID,
                         'orderDate.year': this.orderDate.year,
                         'orderDate.month': this.orderDate.month,
                         'orderDate.day': this.orderDate.day,
                    },
               },
               {
                    $group: {
                         _id: null,
                         orderTimes: { $addToSet: '$orderTime' },
                    },
               },
               {
                    $project: {
                         _id: 0,
                    },
               },
          ]);
          // console.log(tableTimesAggregate[0]);

          let tableTimes: number[] = [];
          tableTimesAggregate[0]?.orderTimes.map((item: number[]) => {
               tableTimes = tableTimes.concat(item);
          });

          // console.log(tableTimes);

          this.orderTime.map(item => {
               if (tableTimes.includes(item)) {
                    next(new Error('Please Provide sufficient data'));
               }
          });

          next();
     } catch (err) {
          console.log(err);
          next(new Error('Data base connection error'));
     }
});

export const Order = models.Order || model('Order', orderSchema);
export const User = models.User || model('User', userSchema);
export const Table = models.Table || model('Table', tableSchema);
export const Food = models.Food || model('Food', foodSchema);
