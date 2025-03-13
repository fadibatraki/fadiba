import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import JewelryBanner from "@/components/banner/jewelry-banner";
import JewelryShopBanner from "@/components/shop-banner/jewelry-shop-banner";
import JewelryAbout from "@/components/about/jewelry-about";
import ProductArea from "@/components/products/jewelry/product-area";
import JewelryBrands from "@/components/brand/jewelry-brands";
import InstagramAreaFour from "@/components/instagram/instagram-area-4";
import FeatureAreaThree from "@/components/features/feature-area-3";
import FooterTwo from "@/layout/footers/footer-2";
import { neon } from "@neondatabase/serverless";

export default function Home() {
  // Function to handle form submission and insert data into the database
  async function create(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const comment = formData.get('comment');

    if (comment) {
      // Connect to the Neon database
      const sql = neon(`${process.env.DATABASE_URL}`);
      await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
      console.log("Comment inserted successfully!");
    }
  }

  return (
    <Wrapper>
      <SEO />
      <HeaderFour />
      <JewelryBanner />
      <FeatureAreaThree />
      <ProductArea />
      <JewelryShopBanner />
      <JewelryAbout />
      <JewelryBrands />
      <InstagramAreaFour />
      <FooterTwo />

      {/* Comment submission form */}
      <div>
        <h1>Submit a Comment</h1>
        <form onSubmit={create}>
          <input type="text" placeholder="Write a comment" name="comment" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Wrapper>
  );
}
