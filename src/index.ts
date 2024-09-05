import "./assest/css/ar-core.css";

// Form Elements
import Button from "./components/form/button";
import ButtonGroup from "./components/form/button-group";
import Input from "./components/form/input";

// Data Display
import Typography from "./components/data-display/typography";
import Divider from "./components/data-display/divider";
import SyntaxHighlighter from "./components/data-display/syntax-highlighter";

// Feedback
import Alert from "./components/feedback/alert";

// Navigation
import Menu from "./components/navigation/menu";
import type { MenuProps } from "./components/navigation/menu/Types";

// Layout
import Grid from "./components/layout/grid-system";
import Layout from "./components/layout";
import useLayout from "./libs/core/application/hooks/useLayout";

// Others

export {
  // Form Elements
  Button,
  ButtonGroup,
  Input,

  // Data Display
  Typography,
  Divider,

  // Feedback
  Alert,

  // Navigation
  Menu,

  // Layout
  Grid,
  Layout,
  useLayout,

  // Others
  SyntaxHighlighter,
};
export type { MenuProps };
