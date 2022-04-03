import ContentLoader from "react-content-loader";

const MembersLoader = (props) => {
  return (
    <div className="opacity-50 w-full ">
      <ContentLoader
        className="w-full"
        speed={1.5}
        height={65}
        backgroundColor="#a1a1aa"
        foregroundColor="#71717a"
        {...props}
      >
        <rect x="4" y="9" rx="6" ry="6" width="40" height="40" />
        <rect x="60" y="23" rx="6" ry="6" width="176" height="10" />
      </ContentLoader>
    </div>
  );
};

export default MembersLoader;
