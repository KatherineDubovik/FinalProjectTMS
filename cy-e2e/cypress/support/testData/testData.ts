export const invalidEmails = ["andrew@test", "andrew", "@test.com", "andrew@test@test.com", "     @test.new"];
export const validEmails = ["andrew@test.com", "ANDREW@TEST.COM", "andrew-1234@test.com", "andrew_new@test.tech", "andrew@test.comp.ru"];

export const invalidPasswords = {
    lowercase_character: "PASSWORD1$",
    uppercase_character: "password1$",
    number: "Password$",
    special_character: "Password1",
    minimum_length: "Psswr1$"
}

export const validCreds = {
    email: "matthew@company.test",
    password: "Password1$"
}
