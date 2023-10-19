import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const BlogPost = () => {
  const formattedText = `
  <h1><strong>Anime</strong></h1>
  <p>This is content</p>
  <p><br></p>
  <ul><li>This is list</li></ul>
`;
  return (
    <>
      <div className="bg-primary-color bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text">
        <NavBar />
        <div className="h-auto w-[90%] md:w-[50%] rounded-lg mx-auto bg-secondary-bg dark:bg-secondary-darkMode-bg shadow">
          <img
            src="https://us.123rf.com/450wm/photochicken/photochicken2008/photochicken200800065/153425631-pritty-young-asian-photographer-girl-teen-travel-with-camera-trip-take-a-photo-tourist-lifestyle.jpg?ver=6"
            alt="cover image"
            className="w-full object-cover rounded-t-md md:rounded-t-lg max-h-[175px] md:max-h-[400px]"
          />
          <div className="article-section p-2 md:p-8">
            <div className="user-profile flex gap-4 my-2 md:my-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                alt="profilePicture"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-sm">John Doe</p>
                <span className="text-gray-600 text-xs">Posted on Oct 12</span>
              </div>
            </div>
            <div className="title text-2xl md:text-5xl font-bold py-2 md:py-4">
              Blog Title
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: formattedText }}
              className="prose" // Use the 'prose' class from Tailwind CSS to style the content
            />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae modi dolores necessitatibus, deserunt nobis maiores
            aliquam?atus sit aliquid a quidem molestias? Rem labore dolores
            porro, sint fuga atque debitis recusandae hic incidunt nisi
            aspernatur in architecto magni ex quos itaque. Officiis facere
            voluptatibus odio iste illum soluta, laborum sequi inventore, iure
            accusamus exercitationem pariatur, provident tempore illo. Adipisci
            numquam perferendis laborum eum, accusantium, a hic sint provident,
            placeat similique nobis! Autem numquam nostrum hic eius neque
            reiciendis, magni ex! Vero, eum commodi. Earum facere in ipsam
            labore ex quod culpa, ducimus eum dolorum, cum dignissimos! Sequi
            deleniti eum doloremque consequatur, fugit minus doloribus porro
            ratione aut repellat autem eos, omnis architecto neque nulla quia
            quisquam rerum ut eligendi recusandae. Dolorem et, ipsam qui, rerum
            consequuntur aperiam dolorum deleniti ullam earum praesentium labore
            animi eos veniam eius ex possimus facere natus itaque quisquam
            architecto modi maxime ducimus illo. Eius adipisci expedita
            reprehenderit repudiandae exercitationem atque modi explicabo quas
            inventore error? Quidem voluptatibus praesentium eius distinctio
            atque provident repellat aliquam earum cumque aspernatur pariatur
            obcaecati veniam eaque error animi neque culpa a ipsa, sit alias
            nesciunt. Tempore, ex? Praesentium veritatis non ratione maxime,
            soluta saepe necessitatibus eius corporis quasi iusto optio.
            <hr />
            <p className="text-2xl p-2">
              👏<span className="ml-4">3 Likes</span>
            </p>
            <hr />
            <div>
              <h2 className="text-2xl font-bold py-4">Comments</h2>
              <div className="flex gap-4">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  alt="profilePicture"
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                />
                <textarea
                  id="message"
                  rows={2}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-darkMode-bg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </div>
            </div>
            <div className="">
              <div className="flex gap-4 py-4">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  alt="profilePicture"
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                />
                <div className="bg-inherit w-full rounded-lg border p-4">
                  <div className="flex items-center gap-4 mb-2">
                    <p className="font-bold">John Doe</p>
                    <span>.</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Oct 12
                    </span>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nam explicabo atque laboriosam!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
