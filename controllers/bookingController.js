const Booking = require("../models/booking");
const Home = require("../models/home");

exports.postBooking = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const { homeId, checkIn, checkOut, guests } = req.body;

    const home = await Home.findById(homeId);
    if (!home) return res.redirect("/");

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    const totalPrice = nights * home.price;

    const booking = new Booking({
      home: homeId,
      user: req.session.user._id,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
      status: "Confirmed",
    });

    await booking.save();

    res.redirect("/bookings");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};
