interface CompanyFrameProps {
  title: string;
  children: React.ReactNode;
}

const CompanyFrame = ({ title, children }: CompanyFrameProps) => {
  return (
    <div className="bg-white rounded p-5 md:p-10">
      <div className="font-bold text-lg mb-6 pb-4 border-b border-primary text-primary">
        {title}
      </div>
      {children}
    </div>
  );
};

export default CompanyFrame;
