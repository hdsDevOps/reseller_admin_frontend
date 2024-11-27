// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    makeUserLoginThunk,
    verifyUserOtpThunk,
    getUserAuthTokenFromLSThunk,
    setUserAuthTokenToLSThunk,
    removeUserAuthTokenFromLSThunk,
    resendUserOtpThunk,
    getCustomerListThunk
} from '../thunks/user.thunk';
import { userLocalStorage } from '../localStorage/user.storage';

export interface UserDetailsState {
  userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
  userDetails: any;
  userId: number | null;
  token: string | null;
}

const initialState: UserDetailsState = {
  userAuthStatus: 'PENDING',
  userDetails: {},
  userId: null,
  token: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setTokenDetails: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setUserAuthStatus: (state, action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>) => {
      state.userAuthStatus = action.payload;
    },
    resetUserSlice: (state) => {
      state.userAuthStatus = 'PENDING';
      state.userDetails = {};
      state.userId = null;
      state.token = '';
    },
  },
  extraReducers: builder => {
    // user login
    builder.addCase(makeUserLoginThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(makeUserLoginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.userAuthStatus = 'AUTHORIZED';
        state.userId = action.payload.userId;
      },
    );

    builder.addCase(makeUserLoginThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

    // verify otp
    builder.addCase(verifyUserOtpThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(verifyUserOtpThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.userAuthStatus = 'AUTHORIZED';
        // console.log(action.payload);
      },
    );

    builder.addCase(verifyUserOtpThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });
    
    // resend otp
    builder.addCase(resendUserOtpThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(resendUserOtpThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        // state.userId = action.payload.userId;
      },
    );

    builder.addCase(resendUserOtpThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

    // set token
    builder.addCase(setUserAuthTokenToLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(setUserAuthTokenToLSThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.userAuthStatus = 'AUTHORIZED';
        console.log('called');
      },
    );

    builder.addCase(setUserAuthTokenToLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

    // get token
    builder.addCase(getUserAuthTokenFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(getUserAuthTokenFromLSThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.token = action.payload;
      },
    );

    builder.addCase(getUserAuthTokenFromLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });

    // remove token
    builder.addCase(removeUserAuthTokenFromLSThunk.pending, state => {
      state.userAuthStatus = 'PENDING';
    });

    builder.addCase(removeUserAuthTokenFromLSThunk.fulfilled,
      (state) => {
        state.userAuthStatus = 'AUTHORIZED';
        state = initialState;
      },
    );

    builder.addCase(removeUserAuthTokenFromLSThunk.rejected, state => {
      state.userAuthStatus = 'UN_AUTHORIZED';
    });
  },
});

export const { setTokenDetails, setUserDetails, setUserAuthStatus, resetUserSlice } = authSlice.actions;

export default authSlice.reducer;
