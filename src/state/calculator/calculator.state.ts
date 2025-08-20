export const ActionTypes = {
  SET_REGION: 'SET_REGION',
  SET_TARIFF: 'SET_TARIFF',
  SET_VOLUME_MWH: 'SET_VOLUME_MWH',
  SET_VOLUME_KW: 'SET_VOLUME_KW',
  SET_FIRST_NAME: 'SET_FIRST_NAME',
  SET_LAST_NAME: 'SET_LAST_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_DETAILS_ADDED: 'SET_DETAILS_ADDED',
};

// Initial Reducer State
export const initialCalcState = {
  selectedRegion: null,
  selectedTariff: null,
  volumeMwh: '',
  volumeKw: '',
  firstName: null,
  lastName: null,
  email: null,
  detailsAdded: false,
};

export const calcReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_REGION:
      return { ...state, selectedRegion: action.payload };
    case ActionTypes.SET_TARIFF:
      return { ...state, selectedTariff: action.payload };
    case ActionTypes.SET_VOLUME_MWH:
      return { ...state, volumeMwh: action.payload };
    case ActionTypes.SET_VOLUME_KW:
      return { ...state, volumeKw: action.payload };
    case ActionTypes.SET_FIRST_NAME:
      return { ...state, firstName: action.payload };
    case ActionTypes.SET_LAST_NAME:
      return { ...state, lastName: action.payload };
    case ActionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case ActionTypes.SET_DETAILS_ADDED:
      return { ...state, detailsAdded: action.payload };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
};
