

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
  ,IconAlignBoxCenterBottom

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
  { header: 'ADMINISTRAR' },
  {
    title: "Home",
    icon: IconCards,
    to: "/",
  },
  {
    title: "Gestor ingresos",
    icon: IconCards,
    to: "/gestoringreso",
  },

  { header: 'INVENTARIO' },
  {
    title: "Gestor de Inventarios",
    icon: IconAlignBoxCenterBottom,
    to: "/gestorinventario",

  },
  {
    title: "Rack",
    icon: IconAlignBoxCenterBottom,
    to: "/gestorrack",
  
  },
  { header: 'PROYECTO' },
  {
    title: "Gestor de proyectos",
    icon: IconTable,
    to: "/gestorproyecto",
    //to: "/ui-components/alerts",
  },
  { header: 'WISH-LIST' },
  {
    title: "Wish-list",
    icon: IconAlignBoxCenterBottom,
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


