export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'wrench' | 'shield' | 'wifi' | 'database';
  keyPoints: string[];
  idealFor: string;
  typicalTime: string;
  popular?: boolean;
}

