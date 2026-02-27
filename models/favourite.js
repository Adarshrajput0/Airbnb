const mongoose = require("mongoose");
const favouriteSchema = mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("Favourite", favouriteSchema);
// module.exports = class Favourite {
//   constructor(houseId) {
//     this.houseId = houseId;
//   }

//   save() {
//     const db = getDB();
//     return db
//       .collection("favourites")
//       .findOne({ houseId: this.houseId })
//       .then((existingFav) => {
//         if (!existingFav) {
//           return db.collection("favourites").insertOne(this);
//         }
//         return Promise.resolve();
//       });
//   }

//   static getFavourites() {
//     const db = getDB();
//     return db.collection("favourites").find().toArray();
//   }
//   static deleteById(delHomeId) {
//     const db = getDB();
//     return db.collection("favourites").deleteOne({ houseId: delHomeId });
//   }
// };
