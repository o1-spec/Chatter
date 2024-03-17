import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection } from "firebase/firestore";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [mostClickedBlog, setMostClickedBlog] = useState(null);

  useEffect(() => {
    // Function to fetch analytics data from Firestore
    const fetchAnalyticsData = async () => {
      try {
        // Fetch analytics data from Firestore
        const analyticsSnapshot = await db
          .collection("analytics")
          .doc("data")
          .get();
        const analytics = analyticsSnapshot.data();
        setAnalyticsData(analytics);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    // Function to fetch the most clicked blog
    const fetchMostClickedBlog = async () => {
      try {
        // Fetch most clicked blog from Firestore
        // You need to implement the logic to determine the most clicked blog
        // This could involve querying the analytics data or maintaining a separate collection for blog clicks
        const mostClickedBlogSnapshot = await db
          .collection("blogs")
          .orderBy("clicks", "desc")
          .limit(1)
          .get();
        const mostClickedBlogData = mostClickedBlogSnapshot.docs[0].data();
        setMostClickedBlog(mostClickedBlogData);
      } catch (error) {
        console.error("Error fetching most clicked blog:", error);
      }
    };

    fetchAnalyticsData();
    fetchMostClickedBlog();
  }, []);

  return (
    <div>
      {/* Display analytics information */}
      {analyticsData && (
        <div>
          <h2>Analytics Information</h2>
          <p>Total Views: {analyticsData.totalViews}</p>
          <p>Total Likes: {analyticsData.totalLikes}</p>
          <p>Total Comments: {analyticsData.totalComments}</p>
          <p>Total Bookmarks: {analyticsData.totalBookmarks}</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
