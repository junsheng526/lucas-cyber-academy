import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import StartRating from "../../components/molecules/StartRating";
import GuestsInput from "./GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";

export const CourseDetailsSidebar = () => {
  return (
    <div className="listingSectionSidebar__wrap shadow-xl p-6 rounded-2xl bg-white">
      {/* PRICE */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-semibold">
          $119
          <span className="ml-1 text-base font-normal text-neutral-500">
            /night
          </span>
        </span>
        <StartRating />
      </div>

      {/* FORM */}
      <form className="flex flex-col border border-neutral-200 rounded-3xl mb-6">
        {/* StayDatesRangeInput */}
        <div className="p-4">
          <StayDatesRangeInput className="flex-1 z-[11]" />
        </div>
        <div className="w-full border-b border-neutral-200" />

        {/* GuestsInput */}
        <div className="p-4">
          <GuestsInput className="flex-1" />
        </div>
      </form>

      {/* SUM */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between text-neutral-600">
          <span>$119 x 3 night</span>
          <span>$357</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Service charge</span>
          <span>$0</span>
        </div>
        <div className="border-b border-neutral-200"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>$199</span>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <ButtonPrimary className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-200">
        Reserve
      </ButtonPrimary>
    </div>
  );
};
