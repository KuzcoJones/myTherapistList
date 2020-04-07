class TherapistsSerializer 
    def initialize(therapist_object)
        @therapist = therapist_object
    end
    
    def to_serialized_json
            @therapist.to_json(
                only: [:id, :bio, :location, :services, :specialties],
            include: [user: {only: [:id, :username, :full_name, :isTherapist]}, followers: {only: [:client_id, :therapist_id]}]
            )
    end
end