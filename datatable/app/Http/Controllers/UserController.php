<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserController extends Controller
{
    public const PER_PAGE = 10;
    public const DEFAULT_SORT_FIELD= 'created_at';
    public const DEFAULT_SORT_ORDER ='asc';
    /**
     * @var string[]
     */
    protected array $sortFields = ['name', 'address', 'email'];

    /**
     * UsersController constructor.
     *
     * @param User $user
     */
    public function __construct(public User $user)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $sortFieldInput = $request->input('sort_field', self::DEFAULT_SORT_FIELD);
        $sortField      = in_array($sortFieldInput, $this->sortFields) ? $sortFieldInput : self::DEFAULT_SORT_FIELD;
        $sortOrder      = $request->input('sort_order', self::DEFAULT_SORT_ORDER);
        $searchInput    = $request->input('search');
        $query          = $this->user->orderBy($sortField, $sortOrder);
        $perPage        = $request->input('per_page') ?? self::PER_PAGE;
        if (!is_null($searchInput)) {
            $searchQuery = "%$searchInput%";
            $query       = $query->where('name', 'like', $searchQuery)->orWhere('email', 'like', $searchQuery)->orWhere(
                'address',
                'like',
                $searchQuery
            );
        }
        $users = $query->paginate((int)$perPage);

        return UserResource::collection($users);
    }
}
