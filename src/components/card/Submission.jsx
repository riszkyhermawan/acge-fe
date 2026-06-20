import SecondaryButton from "../button/SecondaryButton";

const Submission = ({  status, username, full_name }) => {
    return (
      <div className="flex flex-row items-center justify-between bg-black-400/25 bg-clip-padding backdrop-filter backdrop-blur-lg border-2 border-gray-100 rounded-2xl shadow-md px-6 py-4">
        <div className="w-full text-white flex flex-col px-2">
          <h1 className="text-2xl font-bold mb-4">{full_name}</h1>
          <p className="text-md line-clamp-1">NIM: {username}</p>
        </div>
        <div className="w-fit h-full justify-center items-center flex flex-col ">
          <span
            className={`px-2.5 py-0.5 rounded-full font-semibold text-base w-fit ${
              status === "Passed"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : status === "on progress"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {status}
          </span>

          <SecondaryButton
            text="Solve"
            // link={`/student/dashboard/questions/${submissionId}`}
            primaryColor="green"
          />
        </div>
      </div>
    );
}

export default Submission;