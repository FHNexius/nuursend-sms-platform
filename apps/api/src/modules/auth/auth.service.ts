import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async register(signupDto: SignupDto) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase.auth.signUp({
      email: signupDto.email,
      password: signupDto.password,
      options: {
        data: {
          full_name: signupDto.fullName,
        },
      },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return {
      user: data.user,
      session: data.session,
    };
  }

  async login(loginDto: LoginDto) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      user: data.user,
      session: data.session,
    };
  }

  async logout(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return { message: 'Logged out successfully' };
  }

  async getCurrentUser(userId: string) {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw new UnauthorizedException('User not found');
    }

    return data;
  }
}

