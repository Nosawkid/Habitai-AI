import React, { useState } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link
import { ShieldCheck, User, BadgeCheck, CheckCircle, Lock } from "lucide-react"; // Added Lock icon

const VenueDetails = ({ venues }) => {
  const { id } = useParams();
  const venue = venues.find((v) => v.id === parseInt(id));

  // --- MOCK REVIEWS DATA ---
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      user: "Rahul S.",
      rating: 5,
      text: "The generator backup is a lifesaver during exams. Highly recommend!",
      isVerified: true,
      date: "2 days ago",
    },
    {
      id: 2,
      user: "Ankit (Guest)",
      rating: 3,
      text: "Food is okay, but the wifi is spotty on the 3rd floor.",
      isVerified: false,
      date: "1 week ago",
    },
  ]);

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // CHECK LOGIN STATUS
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!venue) return <div className="p-10 text-center">Venue not found</div>;

    const handleSubmit = () => {
    if (!review || rating === 0) {
        alert("Please select a rating and write a review!");
        return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
        // 1. CHECK IF EMAIL IS MSRIT
        const isMsrit = loggedInUser.email.toLowerCase().endsWith("@msrit.edu");

        const newReview = {
        id: reviewsList.length + 1,
        // If MSRIT, add (Verified), otherwise just show the name
        user: loggedInUser.email.split("@")[0] + (isMsrit ? " (Verified)" : ""),
        rating: rating,
        text: review,
        // 2. ONLY GIVE BLUE TICK IF MSRIT
        isVerified: isMsrit,
        date: "Just now",
        };

        setReviewsList([newReview, ...reviewsList]);
        setIsSubmitting(false);
        setSubmitted(true);
        setReview("");
        setRating(0);
    }, 1500);
    };
  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="h-64 overflow-hidden relative">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-6 pt-20">
            <h1 className="text-3xl font-bold text-white mb-1">{venue.name}</h1>
            <p className="text-gray-200 text-sm flex items-center">
              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold mr-2">
                {venue.rating} ★
              </span>
              {venue.distance} from Campus
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-indigo-900 font-bold text-sm mb-2 uppercase tracking-wide flex items-center">
              ✨ Gemini AI Summary
            </h3>
            <p className="text-indigo-800 text-sm italic leading-relaxed">
              "{venue.aiSummary}"
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- LEFT COLUMN: SUBMIT Review (LOCKED IF NOT LOGGED IN) --- */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
            <ShieldCheck className="mr-2 text-blue-600" />
            Submit an Review
          </h2>

          {!loggedInUser ? (
            // --- LOCKED STATE ---
            <div className="text-center py-8 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="text-gray-500" size={20} />
              </div>
              <h3 className="text-gray-900 font-bold mb-1">
                Student Verification Required
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                To maintain trust, only verified MSRIT students can submit
                reviews.
              </p>
              <Link to="/login">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition shadow-md w-full">
                  Login with College ID
                </button>
              </Link>
            </div>
          ) : submitted ? (
            // --- SUCCESS STATE ---
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800">
                Review Verified!
              </h3>
              <p className="text-green-600 text-sm mt-2">
                Review added by{" "}
                <span className="font-bold">{loggedInUser.email}</span>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm underline"
              >
                Submit another
              </button>
            </div>
          ) : (
            // --- FORM STATE (Visible only to Students) ---
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Safety Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRating(num)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${
                        rating >= num
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full border border-gray-200 bg-gray-50 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                rows="3"
                placeholder={`Posting as ${loggedInUser.email}...`}
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full text-white font-bold py-3 rounded-xl transition-all ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Verifying..." : "Submit Official Review"}
              </button>
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: REVIEWS LIST (Always Visible) --- */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Reviews</h2>
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full mr-3">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 flex items-center">
                      {rev.user}
                      {rev.isVerified && (
                        <span className="ml-2 bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full flex items-center border border-blue-200">
                          <BadgeCheck size={12} className="mr-1" />
                          Verified
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-500">{rev.date}</p>
                  </div>
                </div>
                <div className="flex bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                  {rev.rating} ★
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
