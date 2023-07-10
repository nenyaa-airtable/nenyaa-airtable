export const getMeetingTypeCode = (meetingType: string): string => {
  switch (meetingType) {
    case '11th Step Meditation':
      return '11';
    case '12 Steps & 12 Traditions':
      return '12x12';
    case 'As Bill Sees It':
      return 'ASBI';
    case 'Babysitting Available':
      return 'BA';
    case 'Big Book':
      return 'B';
    case 'Birthday':
      return 'H';
    case 'Breakfast':
      return 'BRK';
    case 'Candlelight':
      return 'CAN';
    case 'Child-Friendly':
      return 'CF';
    case 'Closed':
      return 'C';
    case 'Concurrent with Al-Anon':
      return 'AL-AN';
    case 'Concurrent with Alateen':
      return 'AL';
    case 'Cross Talk Permitted':
      return 'XT';
    case 'Daily Reflections':
      return 'DR';
    case 'Digital Basket':
      return 'DB';
    case 'Discussion':
      return 'D';
    case 'English':
      return 'EN';
    case 'Fragrance Free':
      return 'FF';
    case 'French':
      return 'FR';
    case 'Gay':
      return 'G';
    case 'Grapevine':
      return 'GR';
    case 'Indigenous':
      return 'NDG';
    case 'Italian':
      return 'ITA';
    case 'Japanese':
      return 'JA';
    case 'Korean':
      return 'KOR';
    case 'Lesbian':
      return 'L';
    case 'Literature':
      return 'LIT';
    case 'Living Sober':
      return 'LS';
    case 'LGBTQ':
      return 'LGBTQ';
    case 'Meditation':
      return 'MED';
    case 'Men':
      return 'M';
    case 'Native American':
      return 'N';
    case 'Newcomer':
      return 'BE';
    case 'Non-Smoking':
      return 'NS';
    case 'Online Meeting':
      return 'ONL';
    case 'Open':
      return 'O';
    case 'People of Color':
      return 'POC';
    case 'Polish':
      return 'POL';
    case 'Portuguese':
      return 'POR';
    case 'Professionals':
      return 'P';
    case 'Punjabi':
      return 'PUN';
    case 'Russian':
      return 'RUS';
    case 'Secular':
      return 'A';
    case 'Sign Language':
      return 'ASL';
    case 'Smoking Permitted':
      return 'SM';
    case 'Spanish':
      return 'S';
    case 'Speaker':
      return 'SP';
    case 'Step Meeting':
      return 'ST';
    case 'Temporary Closure':
      return 'TC';
    case 'Tradition Study':
      return 'TR';
    case 'Transgender':
      return 'T';
    case 'Wheelchair Access':
      return 'X';
    case 'Wheelchair-Accessible Bathroom':
      return 'XB';
    case 'Women':
      return 'W';
    case 'Young People':
      return 'Y';
    default:
      return '';
  }
};
