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
  collegeDiscovery: CollegeDiscovery,
  real_estate: RealEstateExplorer,
  realEstate: RealEstateExplorer,
  ecommerce: EcommerceStore,
  eCommerce: EcommerceStore,
  e_commerce: EcommerceStore,
  saas_dashboard: SaaSDashboard,
  saasDashboard: SaaSDashboard,
  dashboard: SaaSDashboard,
  job_board: JobBoard,
  jobBoard: JobBoard,
  social_feed: SocialFeed,
  socialFeed: SocialFeed,
  social: SocialFeed,
  feed: SocialFeed,
  booking_system: BookingSystem,
  bookingSystem: BookingSystem,
  booking: BookingSystem,
  portfolio_gallery: PortfolioGallery,
  portfolioGallery: PortfolioGallery,
  portfolio: PortfolioGallery,
  blog_platform: BlogPlatform,
  blogPlatform: BlogPlatform,
  blog: BlogPlatform,
  event_ticketing: EventTicketing,
  eventTicketing: EventTicketing,
  events: EventTicketing,
};
