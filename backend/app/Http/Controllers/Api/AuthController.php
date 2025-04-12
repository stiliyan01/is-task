<?php
    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use App\Http\Requests\Api\Auth\LoginUserRequest;
    use App\Http\Requests\Api\Auth\RegisterUserRequest;
    use App\Models\User;
    use App\Traits\ApiResponses;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;

    class AuthController extends Controller
    {
        use ApiResponses;
        public function login(LoginUserRequest $request) {
            $request->validated($request->all());
            if (!Auth::attempt($request->only('email', 'password'))) {
                return $this->error('Invalid credentials', 401);
            }

            $user = User::firstWhere('email', $request->email);
            
          

            return $this->ok(
                'Authenticated',
                [
                    'token' => $user->createToken('API token for ' . $user->email)->plainTextToken,
                    'user' => $user,
                ]
                );
        }

        public function register(RegisterUserRequest $request) {
            $request->validated($request->all());

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            return $this->ok('User created successfully', [
                'token' => $user->createToken('API token for ' . $user->email)->plainTextToken,
                'user' => $user
            ]);
        }
        public function logout(Request $request) {
            if ($request->user()?->currentAccessToken()) {
                $request->user()->currentAccessToken()->delete();
            }
        
            return response()->json([
                'message' => 'Изходът е успешен.',
            ]);
        }
    }
