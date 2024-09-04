import "./assest/css/ar-core.css";

// Form Elements
import Button from "./components/form/button";
import ButtonGroup from "./components/form/button-group";
import Input from "./components/form/input";

// Data Display
import Typography from "./components/typography";
import Divider from "./components/divider";

// Feedback
import Alert from "./components/alert";

// Navigation
import Menu from "./components/menu";
import type { MenuProps } from "./components/menu/Types";

// Layout
import Grid from "./components/grid-system";
import Layout from "./components/layout";
import useLayout from "./libs/core/application/hooks/useLayout";

// Others
import SyntaxHighlighter from "./components/syntax-highlighter";

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
