import DynamicForm from "@/components/runtime/DynamicForm";
import DynamicLanding from "@/components/runtime/DynamicLanding";
import CollegeDiscovery from "@/components/runtime/templates/CollegeDiscovery";
import RealEstateExplorer from "@/components/runtime/templates/RealEstateExplorer";
import EcommerceStore from "@/components/runtime/templates/EcommerceStore";
import SaaSDashboard from "@/components/runtime/templates/SaaSDashboard";
import JobBoard from "@/components/runtime/templates/JobBoard";
import SocialFeed from "@/components/runtime/templates/SocialFeed";
import BookingSystem from "@/components/runtime/templates/BookingSystem";
import PortfolioGallery from "@/components/runtime/templates/PortfolioGallery";
import BlogPlatform from "@/components/runtime/templates/BlogPlatform";
import EventTicketing from "@/components/runtime/templates/EventTicketing";

export const componentRegistry: Record<string, any> = {
  form: DynamicForm,
  landing: DynamicLanding,
  college_discovery: CollegeDiscovery,
  real_estate: RealEstateExplorer,
  ecommerce: EcommerceStore,
  saas_dashboard: SaaSDashboard,
  job_board: JobBoard,
  social_feed: SocialFeed,
  booking_system: BookingSystem,
  portfolio_gallery: PortfolioGallery,
  blog_platform: BlogPlatform,
  event_ticketing: EventTicketing,
};
