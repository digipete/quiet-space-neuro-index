import { 
  VolumeX, 
  Sun, 
  Lightbulb, 
  Headphones, 
  Settings, 
  Coffee,
  Target,
  Feather,
  Radio,
  Leaf,
  Shield,
  Clock,
  Thermometer,
  Wind,
  Trees,
  Armchair
} from 'lucide-react';

interface AmenityIconProps {
  name: string;
  className?: string;
}

const iconMap = {
  'volume-x': VolumeX,
  'sun': Sun,
  'lightbulb': Lightbulb,
  'headphones': Headphones,
  'settings': Settings,
  'coffee': Coffee,
  'target': Target,
  'feather': Feather,
  'radio': Radio,
  'leaf': Leaf,
  'shield': Shield,
  'clock': Clock,
  'thermometer': Thermometer,
  'wind': Wind,
  'trees': Trees,
  'armchair': Armchair
};

export function AmenityIcon({ name, className = "w-4 h-4" }: AmenityIconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    return <div className={`${className} bg-muted-foreground/20 rounded`} />;
  }
  
  return <IconComponent className={className} />;
}