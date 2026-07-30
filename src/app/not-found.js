import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex justify-evenly items-center">
      <div className="flex flex-col">
        <h1 className="text-[#282828] mb-4 font-semibold text-[36px]">
          صفحه مورد نظر یافت نشد!
        </h1>
        <Link
          className="text-[#28A745] bg-[#D8FFE1] text-center py-3 text-[28px] font-semibold rounded-2xl"
          href="/"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <div>
        <Image
          src="/images/Error TV.png"
          width={500}
          height={500}
          alt="not-found"
        />
      </div>
    </div>
  );
}

export default NotFound;
