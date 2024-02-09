import { Link } from "react-router-dom";
import Image404 from "../assets/images/404.svg";

export const Page404 = () => {
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div
              className="card-body d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <div>
                <img alt="404" src={Image404} className="h-200px" />

                <Link to="/" className="btn btn-outline-primary mt-10 d-block">
                  Regresa a la pagina principal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
