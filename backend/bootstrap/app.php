<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Sanctum middleware за SPA auth с cookies (CSRF + session)
        $middleware->statefulApi();

        // Това добавя EnsureFrontendRequestsAreStateful в API middleware групата
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        // (по избор) Алиаси за допълнителни middleware-и
        // $middleware->alias([
        //     'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
