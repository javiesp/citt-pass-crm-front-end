

import {
  BorderAllIcon,
  AlertCircleIcon,
  CircleDotIcon,
  BoxMultiple1Icon,
  AdjustmentsHorizontalIcon,
  LayoutDashboardIcon

} from 'vue-tabler-icons';
import { 
  IconCards
  , IconTable 
  , IconPackages
  , IconShoppingBag
  , IconHeart
  , IconUserCheck 
  , IconUsersGroup 
} from '@tabler/icons-vue';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'GESTOR USUARIO' },
  {
    title: "Usuarios (check-in)",
    icon: IconCards,
    to: "/gestoringreso",
  },

  { header: 'GESTOR INVENTARIO' },
  {
    title: "Inventarios",
    icon: IconPackages,
    to: "/gestorinventario",

  },
  {
    title: "Rack",
    icon: BorderAllIcon,
    to: "/gestorrack",
  
  },
  { header: 'GESTOR PROYECTO' },
  {
    title: "Proyectos",
    icon: IconUsersGroup,
    to: "/gestorproyecto",
    //to: "/ui-components/alerts",
  },
  { header: 'GESTOR WISH-LIST' },
  {
    title: "Wish-list",
    icon: IconHeart,
    to: "/wishlist",
  },
  {
    title: "Productos",
    icon: IconShoppingBag,
    to: "/wishlist",
  },
  { header: 'PLANTILLAS' },
  {
    title: "Gestor Botones",
    icon: IconPackages,
    to: "/ui-components/buttons",
  },
  {
    title: "Gestor de productos",
    icon: IconShoppingBag,
    to: "/ui-components/cards",
  },
  {
    title: "Lista de deseados",
    icon: IconHeart,
    to: "/ui-components/curousel",
  },
  {
    title: "Tables",
    icon: BorderAllIcon,
    to: "/ui-components/tabels",
  },

 

];

export default sidebarItem;


