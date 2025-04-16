import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex justify-center items-center block w-[300px] h-auto bg-green-600 text-base text-center text-white py-4 px-2 rounded-xl shadow-slate-700 shadow-md hover:opacity-70"
    >
        <Mail className="w-4 h-4 mr-2" />
      {loading ? "送信中..." : "送信する"}
    </button>
  );
};

export default SubmitButton;
