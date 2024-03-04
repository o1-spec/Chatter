import { Link } from "react-router-dom"

function Trending() {
  return (
    <div className="pb-6">
          <h5 className="text-[17px] pb-5 text-textBlack font-semibold">Trending Tags</h5>
          <ul className="flex flex-col gap-3.5 pl-6">
            <li>
              <Link className="text-[15px]" to="/blog/programming">
                Programing
              </Link>
            </li>
            <li>
              <Link to="/blog/dataScience" className="text-[15px]">
                Data Science
              </Link>
            </li>
            <li>
              <Link to="/blog/technology" className="text-[15px]">
                Technology
              </Link>
            </li>
            <li>
              <Link to="/blog/machineLearning" className="text-[15px]">
                Machine Learning
              </Link>
            </li>
            <li>
              <Link to="/blog/politics" className="text-[15px]">
                Politics
              </Link>
            </li>
            <li>
              <Link to="/blog/all" className="text-[15px]">
                See all
              </Link>
            </li>
          </ul>
        </div>
  )
}

export default Trending