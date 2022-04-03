import ContentLoader from "react-content-loader";

const MessageLoader = (props) => {
  return (
    <div className="opacity-50 w-full ">
      <ContentLoader
        className="w-full"
        speed={2}
        height={108}
        backgroundColor="#a1a1aa"
        foregroundColor="#71717a"
        animate={true}
        {...props}
      >
        <rect x="56" y="11" rx="3" ry="3" width="88" height="6" />
        <rect x="56" y="33" rx="3" ry="3" width="410" height="6" />
        <rect x="56" y="49" rx="3" ry="3" width="380" height="6" />
        <rect x="56" y="65" rx="3" ry="3" width="178" height="6" />
        <rect x="2" y="5" rx="7" ry="7" width="36" height="36" />
      </ContentLoader>
    </div>
  );
};

export default MessageLoader;
