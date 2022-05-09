import BearImg from "../../../assets/bear.svg";

export function BearImage() {
  return (
    <div className=" flex justify-center items-center w-full">
      <img
        src={BearImg}
        className="md:h-[400px] h-[150px] w-full"
        alt="Bear drinking soda"
      />
    </div>
  );
}
