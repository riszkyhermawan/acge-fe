

const SmallModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div
          className=" rounded-lg shadow-lg p-6 z-10 w-96 bg-white"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #000000 40%, #072607 100%)",
          }}
        >
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    );
}

export default SmallModal;