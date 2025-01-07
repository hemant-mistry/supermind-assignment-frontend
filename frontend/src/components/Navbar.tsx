import VideoWalkThrough from "../assets/VideoWalkThroughIcon.png";
import GithubLogo from "../assets/github-icon.png";
import VerveLogo from "../assets/verve.png";
export default function Navbar() {
  return (
    <>
      <div className="navbar-container flex items-center justify-between">
        <div className="brand text-2xl font-semibold flex items-center">
        <img src={VerveLogo} alt="Video Walkthrough" className="w-6 h-6 mr-4" />
          Social Glance
          </div>
        <div className="flex demo">
          <button
            className="btn btn-primary btn-sm rounded-lg"
            onClick={() =>
              (
                document.getElementById("my_modal_1") as HTMLDialogElement
              ).showModal()
            }
          >
            <img src={VideoWalkThrough} alt="Video Walkthrough" />
            View Demo
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box border border-white border-[0.5px] rounded-lg">
              <h3 className="font-bold text-lg text-left">
                Social Glance walkthrough
              </h3>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/qF-uTDAzwPw?si=wGTHKm9Dja6ItYsY"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    className="btn btn-primary btn-sm rounded-lg"
                    onClick={() => {
                      const modal = document.getElementById(
                        "my_modal_4"
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.close();
                      }
                    }}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <a
            href="https://github.com/hemant-mistry/supermind-assignment-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm rounded-lg ml-4 flex items-center"
          >
            <img src={GithubLogo} alt="GitHub" className="w-6 h-6 mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </>
  );
}
