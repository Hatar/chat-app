@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row">

            <div class="col-md-4">

                <h3>Online users</h3>
                <hr>

                <ul class="list-group" id="online-users">
                </ul><!-- End of list group-->

                <h5 id="no-online-user">No Online Users</h5>

            </div><!-- End of column-->

            <div class="col-md-8 d-flex flex-column" style="height:80vh">

                <div class="h-100 bg-white mb-4 p-5" id="chat" style="overflow-y:scroll" >

                    @foreach($messages as $message)
                        <!-- check if user athentifie is equal user send message  -->
                        <div class="mt-4 w-50 text-white p-3 rounded {{ auth()->user()->id == $message->user_id ? 'float-right bg-primary' : 'float-left bg-warning' }}">
                                <p>{{$message->user->name }}</p>
                                <p>{{$message->body }}</p>
                        </div>
                        <div class="clearfix"></div>
                    @endforeach


                </div><!--End of div-->

                <form action="" >
                    <input type="text" name="" data-url="{{ route('messages.store') }}"  class="form-control mb-3" id="chat-text">
                    <button class="btn btn-primary btn-block">Send</button>
                </form>

            </div><!-- End of column-->

        </div><!-- End of row-->
    </div><!-- End of container-->

@endsection